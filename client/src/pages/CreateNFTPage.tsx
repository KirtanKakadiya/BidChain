import React, { useState, JSX } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './CreateNFTPage.css';

export function CreateNFTPage(): JSX.Element {
  const [nftName, setNftName] = useState('');
  const [price, setPrice] = useState('');
  const [auctionDuration, setAuctionDuration] = useState('1 day');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    console.log('Creating NFT:', {
      nftName,
      price,
      auctionDuration,
      description,
      imageFile,
    });
  };

  const handleCancel = () => {
    setNftName('');
    setPrice('');
    setAuctionDuration('1 day');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <Box className="create-nft-page">
      {/* Banner Section */}
      <Box
        className="create-nft-banner"
        sx={{
          backgroundImage: 'url(/bored-ape.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content Section */}
      <Box className="create-nft-content">
        <Typography variant="h2" className="create-nft-title">
          List Your NFT
        </Typography>

        {/* NFT Image Upload */}
        <Box className="nft-upload-section">
          <label htmlFor="nft-image-input" className="nft-upload-box">
            {imagePreview ? (
              <Box
                className="nft-image-preview"
                sx={{
                  backgroundImage: `url(${imagePreview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ) : (
              <Box className="upload-placeholder">
                <AddIcon sx={{ fontSize: 40, color: '#a259ff' }} />
              </Box>
            )}
          </label>
          <input
            id="nft-image-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </Box>

        {/* Form Fields */}
        <Box className="form-fields">
          {/* Item Name */}
          <Box className="form-group">
            <Typography variant="body1" className="form-label">
              Item Name<span className="required">*</span>
            </Typography>
            <Box className="form-field-wrapper">
              <TextField
                placeholder="NFT Name"
                value={nftName}
                onChange={(e) => setNftName(e.target.value)}
                variant="outlined"
                fullWidth
                className="form-input"
                slotProps={{
                  input: {
                    className: 'form-input-root',
                  },
                }}
              />
              <IconButton className="form-edit-icon">
                <EditIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Price */}
          <Box className="form-group">
            <Typography variant="body1" className="form-label">
              Price<span className="required">*</span>
            </Typography>
            <Box className="form-field-wrapper">
              <TextField
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                variant="outlined"
                fullWidth
                type="number"
                className="form-input"
                slotProps={{
                  input: {
                    className: 'form-input-root',
                  },
                }}
              />
              <IconButton className="form-edit-icon">
                <EditIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Auction Duration */}
          <Box className="form-group">
            <Typography variant="body1" className="form-label">
              Auction Duration<span className="required">*</span>
            </Typography>
            <Select
              value={auctionDuration}
              onChange={(e) => setAuctionDuration(e.target.value)}
              className="form-select"
            >
              <MenuItem value="1 day">1 day</MenuItem>
              <MenuItem value="3 days">3 days</MenuItem>
              <MenuItem value="1 week">1 week</MenuItem>
              <MenuItem value="2 weeks">2 weeks</MenuItem>
            </Select>
          </Box>

          {/* Description */}
          <Box className="form-group">
            <Typography variant="body1" className="form-label">
              Description
            </Typography>
            <Box className="form-field-wrapper description">
              <TextField
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                className="form-input"
                slotProps={{
                  input: {
                    className: 'form-input-root',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box className="form-actions">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="create-button"
            onClick={handleCreate}
          >
            Create
          </Button>
          <Button
            variant="contained"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
