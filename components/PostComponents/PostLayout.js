// Components
import Card from "@components/Card";
import { Grid, Stack } from "@mantine/core";
import { Animate } from "react-simple-animate";

export default function PostLayout({ posts, layout }) {
  const postGrids = posts.map((data, index) => (
    <Grid.Col key={index} sm={6} md={6} lg={4}>
      <Card layout={layout} posts={data} />
    </Grid.Col>
  ));

  const postStacks = posts.map((data, index) => (
    <Card key={index} layout={layout} posts={data} />
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
