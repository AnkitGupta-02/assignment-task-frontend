import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { getProduct } from "../../apis/getData-api";

function ProductTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const list = await getProduct();
    setIsLoading(false);
    setData(list);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const ProductCard = ({ data }) => {
    return (
      <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
        <Box sx={{ padding: 2 }}>
          <Button
            variant="contained"
            color="primary"
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </Button>
        </Box>
      </Card>
    );
  };

  return (
    <div className="h-screen px-5">
      {isLoading ? (
        "Loading..."
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "flex-start", mt: 2 }}>
        {data.map((service, index) => (
          <Box key={index} sx={{ width: { xs: "100%", sm: "48%", md: "30%" } }}>
            <ProductCard data={service} />
          </Box>
        ))}
      </Box>
  )}
    </div>
  );
}
export default ProductTab;