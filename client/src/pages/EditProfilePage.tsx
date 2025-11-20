import React, { useState, JSX } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import './EditProfilePage.css';

export function EditProfilePage(): JSX.Element {
  const [username, setUsername] = useState('TheArtist');
  const [email, setEmail] = useState('artist@email.com');
  const [biography, setBiography] = useState(
    "The Internet's Friendliest Designer Kid."
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved:', { username, email, biography });
  };

  return (
    <Box className="edit-profile-page">
      {/* Banner Section */}
      <Box className="edit-profile-banner-container">
        <Box
          className="edit-profile-banner"
          sx={{
            backgroundImage: 'url(/bored-ape.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Box>


      {/* Content Section */}
      <Box className="edit-profile-content">
        {/* Avatar */}
        <Box className="edit-profile-avatar-section">
          <Avatar
            src="/avatar.png"
            alt={username}
            className="edit-profile-avatar"
            sx={{ width: 120, height: 120 }}
          />
          <IconButton className="avatar-edit-button">
            <EditIcon />
          </IconButton>
            <Button
            variant="contained"
            className="edit-banner-button"
            >
            Edit Banner
            </Button>
        </Box>

        {/* Form Fields */}
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

          {/* Email */}
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

          {/* Biography */}
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

          {/* Save Button */}
          {isEditing && (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              className="save-button"
              onClick={handleSave}
            >
              Save
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
