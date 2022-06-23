import Card from "@components/Card";
import { Grid, Stack } from "@mantine/core";
import React from "react";
import { Animate } from "react-simple-animate";

export default function PostLayout({ property, layout }) {
  return (
    <Animate
      play
      start={{ transform: "translateY(2%)", opacity: "0" }}
      end={{ transform: "translateY(0%)", opacity: "1" }}
    >
      {layout === "grid" ? (
        <Grid gutter="xs">
          {property &&
            property.map((data, index) => (
              <Grid.Col key={index} sm={6} md={6} lg={4}>
                <Card layout={layout} property={data} />
              </Grid.Col>
            ))}
        </Grid>
      ) : (
        <Stack spacing={8}>
          {property &&
            property.map((data, index) => (
              <Card layout={layout} key={index} property={data} />
            ))}
        </Stack>
      )}
    </Animate>
  );
}
