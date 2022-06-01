import { Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import React from "react";

function Description({ children }) {
  const createDate = React.Children.map(children, (child) =>
    child.type.displayName === "CreateDate" ? child : null
  );
  const header = React.Children.map(children, (child) =>
    child.type.displayName === "Deader" ? child : null
  );
  const body = React.Children.map(children, (child) =>
    child.type.displayName === "Body" ? child : null
  );
  const button = React.Children.map(children, (child) =>
    child.type.displayName === "Button" ? child : null
  );

  return (
    <div className="flex flex-col gap-2 pt-5">
      <LinkBox as="article" w="full" p="5" borderWidth="1px" rounded="md">
        <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
          {createDate}
        </Box>
        <Heading size="md" my="2">
          <LinkOverlay href="#">{header}</LinkOverlay>
        </Heading>
        <Text>{body}</Text>
      </LinkBox>
      <div className="bg-[#37383a] text-center py-1 rounded-md hover:opacity-75 cursor-pointer">
        {button}
      </div>
    </div>
  );
}

const CreateDate = ({ children }) => children;
CreateDate.displayName = "CreateDate";
Description.CreateDate = CreateDate;

const Header = ({ children }) => children;
Header.displayName = "Header";
Description.Header = Header;

const Body = ({ children }) => children;
Body.displayName = "Body";
Description.Body = Body;

const Button = ({ children }) => children;
Button.displayName = "Button";
Description.Button = Button;

export default Description;
