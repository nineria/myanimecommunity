import { Flex, SimpleGrid } from "@chakra-ui/react";
import Card from "@components/Card";
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
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          spacingX={2}
          spacingY={5}
          paddingTop={2}
        >
          {property &&
            property.map((data, index) => (
              <Card layout={layout} key={index} property={data} />
            ))}
        </SimpleGrid>
      ) : (
        <Flex flexDirection="column" gap={{ sm: 5, md: 1 }} paddingTop={2}>
          {property &&
            property.map((data, index) => (
              <Card layout={layout} key={index} property={data} />
            ))}
        </Flex>
      )}
    </Animate>
  );
}
