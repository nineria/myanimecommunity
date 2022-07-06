import { useContext } from "react";
import { UserContext } from "../lib/context";

// Component's children only shown to logged-in users
export default function AuthorCheck(props) {
  const { username } = useContext(UserContext);

  return username === props.username ? props.children : props.fallback || null;
}
