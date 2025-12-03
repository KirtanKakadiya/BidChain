import React, { useState, useRef, ChangeEvent, JSX } from 'react';
import {
    Box,
    Typography,
    Button,
    Avatar,
    TextField,
    IconButton,
    CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import './EditProfilePage.css';

import { useUploadImage } from '../hooks/useUploadImage';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { GRAPHQL_ENDPOINT } from '../config/env';
import { UPDATE_USER } from '../graphql/mutations/userMutation';


async function updateUserRequest(id: string, data: any) {
    const res = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: UPDATE_USER,
            variables: { id, data },
        }),
    });

    const json = await res.json();
    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    return json.data.updateUser;
}

export function EditProfilePage(): JSX.Element {
    const { user, login } = useAuth();
    const role = user?.role;
    const [username, setUsername] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [biography, setBiography] = useState(user?.description ?? '');
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    // Stored URLs from backend
    const [avatarUrl, setAvatarUrl] = useState<string | null>(
        user?.avatarPicture ?? null
    );
    const [bannerUrl, setBannerUrl] = useState<string | null>(
        user?.bannerPicture ?? null
    );

    const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(
        null
    );
    const [pendingBannerFile, setPendingBannerFile] = useState<File | null>(
        null
    );
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const { uploadImage, uploading, error, resetError } = useUploadImage();

    const avatarInputRef = useRef<HTMLInputElement | null>(null);
    const bannerInputRef = useRef<HTMLInputElement | null>(null);

    const bannerImage = bannerPreview || bannerUrl || '/banner-placeholder.png';


    async function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        resetError();
        setPendingAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));

        e.target.value = '';
    }

    async function handleBannerChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        resetError();
        setPendingBannerFile(file);
        setBannerPreview(URL.createObjectURL(file));

        e.target.value = '';
    }

    const handleSave = async () => {
        if (!user) return;

        setSaving(true);
        resetError();

        try {
            let newAvatarUrl = avatarUrl;
            let newBannerUrl = bannerUrl;

            // Upload pending avatar if any
            if (pendingAvatarFile) {
                const uploadedAvatarUrl = await uploadImage(
                    pendingAvatarFile,
                    'avatar',
                    String(user.id)
                );
                console.log('Uploaded avatar URL:', uploadedAvatarUrl);
                newAvatarUrl = uploadedAvatarUrl;
                setAvatarUrl(uploadedAvatarUrl);
            }

            // Upload pending banner if any
            if (pendingBannerFile) {
                const uploadedBannerUrl = await uploadImage(
                    pendingBannerFile,
                    'banner',
                    String(user.id)
                );
                console.log('Uploaded banner URL:', uploadedBannerUrl);
                newBannerUrl = uploadedBannerUrl;
                setBannerUrl(uploadedBannerUrl);
            }

            const updatePayload = {
                name: username !== user.name ? username : undefined,
                email: email !== user.email ? email : undefined,
                avatarPicture:
                    newAvatarUrl !== user.avatarPicture
                        ? newAvatarUrl
                        : undefined,
                bannerPicture:
                    newBannerUrl !== user.bannerPicture
                        ? newBannerUrl
                        : undefined,
                description:
                    biography !== user.description ? biography : undefined,
            };
            const updatedUser = await updateUserRequest(String(user.id), updatePayload);
            updatedUser.role = role;
            login(updatedUser);

            setPendingAvatarFile(null);
            setPendingBannerFile(null);
            setAvatarPreview(null);
            setBannerPreview(null);

            toast.success('Profile updated!');
            setIsEditing(false);
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    const isBusy = uploading || saving;

    return (
        <Box className="edit-profile-page">
            <input
                type="file"
                accept="image/*"
                ref={avatarInputRef}
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
            />
            <input
                type="file"
                accept="image/*"
                ref={bannerInputRef}
                style={{ display: 'none' }}
                onChange={handleBannerChange}
            />

            <Box className="edit-profile-banner-container">
                <Box
                    className="edit-profile-banner"
                    sx={{
                        backgroundImage: `url(${bannerImage}`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                    }}
                >
                    <Button
                        variant="contained"
                        className="edit-banner-button"
                        startIcon={<EditIcon />}
                        onClick={() => bannerInputRef.current?.click()}
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    >
                        Edit Banner
                    </Button>
                </Box>
            </Box>

            <Box className="edit-profile-content">
                <Box className="edit-profile-avatar-section">
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src={
                                avatarPreview ||
                                avatarUrl ||
                                undefined
                            }
                            alt={username || ''}
                            className="edit-profile-avatar"
                            sx={{ width: 120, height: 120 }}
                        />
                        <IconButton
                            className="avatar-edit-button"
                            onClick={() => avatarInputRef.current?.click()}
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                backgroundColor: '#2f2f2f',
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ mt: 1, mb: 2 }}>
                    {isBusy && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <CircularProgress size={18} />
                            <Typography variant="body2">
                                {uploading
                                    ? 'Uploading image...'
                                    : 'Saving changes...'}
                            </Typography>
                        </Box>
                    )}
                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{ mt: 0.5 }}
                        >
                            {error}
                        </Typography>
                    )}
                </Box>

                <Box className="edit-profile-form">
                    {/* Username */}
                    <Box className="form-group">
                        <Typography variant="body1" className="form-label">
                            Username
                        </Typography>
                        <Box className="form-field-wrapper">
                            <TextField
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={!isEditing}
                                variant="outlined"
                                fullWidth
                                className="profile-input"
                                slotProps={{
                                    input: {
                                        className: 'profile-input-root',
                                    },
                                }}
                            />
                            <IconButton
                                className="field-edit-button"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box className="form-group">
                        <Typography variant="body1" className="form-label">
                            Email
                        </Typography>
                        <Box className="form-field-wrapper">
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!isEditing}
                                variant="outlined"
                                fullWidth
                                type="email"
                                className="profile-input"
                                slotProps={{
                                    input: {
                                        className: 'profile-input-root',
                                    },
                                }}
                            />
                            <IconButton
                                className="field-edit-button"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box className="form-group">
                        <Typography variant="body1" className="form-label">
                            Biography
                        </Typography>
                        <Box className="form-field-wrapper biography">
                            <TextField
                                value={biography}
                                onChange={(e) => setBiography(e.target.value)}
                                disabled={!isEditing}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                className="profile-input"
                                slotProps={{
                                    input: {
                                        className: 'profile-input-root',
                                    },
                                }}
                            />
                            <IconButton
                                className="field-edit-button biography-button"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    {isEditing && (
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            className="save-button"
                            onClick={handleSave}
                            disabled={isBusy}
                        >
                            Save
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
