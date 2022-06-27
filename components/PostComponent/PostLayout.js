import Card from "@components/Card";
import { Grid, Skeleton, Stack } from "@mantine/core";
import React, { useState } from "react";
import { Animate } from "react-simple-animate";

export default function PostLayout({ property, layout }) {
  const [loading, setLoading] = useState(true);

  setTimeout(function () {
    setLoading(false);
  }, 500);

  const postGrids = property.map((data, index) => (
    <Grid.Col key={index} sm={6} md={6} lg={4}>
      <Skeleton visible={loading}>
        <Card layout={layout} property={data} />
      </Skeleton>
    </Grid.Col>
  ));

  const postStacks = property.map((data, index) => (
    <Card layout={layout} key={index} property={data} />
  ));

  return (
    <Animate
      play
      start={{ transform: "translateY(2%)", opacity: "0" }}
      end={{ transform: "translateY(0%)", opacity: "1" }}
    >
      {layout === "grid" ? (
        <Grid gutter="xs">{postGrids}</Grid>
      ) : (
        <Stack spacing={8}>{postStacks}</Stack>
      )}
    </Animate>
  );
}
