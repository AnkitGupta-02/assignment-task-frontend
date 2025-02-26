import React, { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; 
import { getService } from "../../apis/Services-api";

function ServiceTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const list = await getService();
    setIsLoading(false);
    setData(list);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const ServiceCard = ({ service }) => {
    return (
      <Card sx={{ width: "100%", boxShadow: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {service.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {service.description}
          </Typography>
  
          {service.sub_services.map((subService, index) => (
            <Accordion key={index} sx={{ boxShadow: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{subService.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{subService.description}</Typography>
                {subService.technologies && (
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                    {subService.technologies.map((tech, i) => (
                      <Chip key={i} label={tech} variant="outlined" />
                    ))}
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
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
            <ServiceCard service={service} />
          </Box>
        ))}
      </Box>
  )}
    </div>
  );
}
export default ServiceTab;
