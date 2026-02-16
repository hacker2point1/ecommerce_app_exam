import { Grid, Card, Skeleton, Box, Stack } from '@mui/material';

export const ProductSkeleton = () => (
  <Card sx={{ p: 2, height: '100%' }}>
    {/* Product Image Placeholder */}
    <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
    
    <Box sx={{ pt: 2 }}>
      {/* Title Placeholder */}
      <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="80%" />
      
      {/* Price/Description Placeholder */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="40%" />
      
      {/* Actions (e.g., Button) Placeholder */}
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Skeleton variant="rounded" width={100} height={36} />
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>
    </Box>
  </Card>
);