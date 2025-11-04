import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import type { Category } from '../types/category';
import './CategoryCard.css';

type CategoryCardProps = {
    category: Category;
    className?: string;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
    category,
    className,
}) => {
    const { title, icon: Icon } = category;

    return (
        <Card className={`category-card ${className ?? ''}`}>
            <Box className="category-top">
                {Icon ? (
                    <Icon sx={{ fontSize: 56, color: 'black' }} />
                ) : (
                    <span>No Icon</span>
                )}
            </Box>

            <CardContent className="category-footer">
                <Typography
                    variant="h6"
                    className="category-title"
                    sx={{
                        fontFamily: "'Work Sans', sans-serif",
                        fontWeight: 600,
                        color: '#fff',
                    }}
                >
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
};
