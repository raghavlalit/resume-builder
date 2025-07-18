import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Visibility as PreviewIcon,
  Code as CodeIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const HtmlEditor = ({ value, onChange, label, required, helperText, name }) => {
  const [htmlCode, setHtmlCode] = useState(value || '');
  const [previewHtml, setPreviewHtml] = useState(htmlCode);
  const [showPreview, setShowPreview] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setHtmlCode(value || '');
  }, [value]);

  useEffect(() => {
    setPreviewHtml(htmlCode);
  }, [htmlCode]);

  const handleHtmlChange = (e) => {
    const newValue = e.target.value;
    setHtmlCode(newValue);
    // Create a proper event object with name and value
    const syntheticEvent = {
      target: {
        name: name,
        value: newValue
      }
    };
    onChange(syntheticEvent);
  };

  const refreshPreview = () => {
    setRefreshKey(prev => prev + 1);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" color="primary.main" fontWeight={600}>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Toggle Preview">
            <IconButton
              size="small"
              onClick={togglePreview}
              color={showPreview ? 'primary' : 'default'}
            >
              <PreviewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh Preview">
            <IconButton size="small" onClick={refreshPreview}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', gap: 2, height: '400px' }}>
          {/* HTML Editor */}
          <Box sx={{ width: '50%' }}>
            <TextField
              fullWidth
              multiline
              name={name}
              value={htmlCode}
              onChange={handleHtmlChange}
              required={required}
              variant="outlined"
              size="medium"
              helperText={helperText}
              sx={{
                height: '100%', // 👈 key fix
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  height: '100%', // ensure the input root fills
                  alignItems: 'stretch', // align textarea correctly
                },
                '& textarea': {
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  height: '100% !important', // fill height
                  boxSizing: 'border-box',
                },
              }}
            />
          </Box>

          {/* Preview */}
          {showPreview && (
            <>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ width: '50%' }}>
                <Paper
                  sx={{
                    height: '100%',
                    p: 2,
                    overflow: 'auto',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Preview
                  </Typography>
                  <Box
                    key={refreshKey}
                    sx={{
                      minHeight: '350px',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 2,
                      bgcolor: 'background.paper',
                    }}
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </Paper>
              </Box>
            </>
          )}
        </Box>
      </Box>

    </Box>
  );
};

export default HtmlEditor; 