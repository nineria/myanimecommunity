import { useContext } from "react";
import { UserContext } from "../lib/context";

export const ADMIN_UID = "ViTbVpVfXVQHcK9WmvzAUJggayk2";

// Component's children only shown to logged-in users
export default function AdminCheck(props) {
  const { user } = useContext(UserContext);

  return user.uid === ADMIN_UID ? props.children : props.fallback || null;
}
