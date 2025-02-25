import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, Typography, Button,Box } from "@mui/material";
import { getResearch } from "../../apis/getData-api";

function ResearchTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const list = await getResearch();
    setIsLoading(false);
    setData(list);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const ResearchCard = ({ data }) => {
    return (
      <Card sx={{ maxWidth: 400, boxShadow: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {data.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {data.type} • {data.year}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {data.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            href={data.doi}
            target="_blank"
            sx={{ mt: 2 }}
          >
            Read More
          </Button>
        </CardContent>
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
            <ResearchCard data={service} />
          </Box>
        ))}
      </Box>
  )}
    </div>
  );
}
export default ResearchTab;