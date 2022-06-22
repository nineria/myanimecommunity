import { auth, firestore, googleAuthProvider } from "@lib/firebase";
import { UserContext } from "@lib/context";
import Navbar from "@components/Navbar";

import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import { Container, Image } from "@chakra-ui/react";
import UserProfile from "@components/UserProfile";
import { useThemeContext } from "@lib/useTheme";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  const { setTheme } = useThemeContext();

  useEffect(() => {
    const localData = localStorage.getItem("themes");
    if (localData == null) {
      localStorage.setItem("themes", "red");
      setTheme("red");
    }
    setTheme(localData);
  }, []);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />

  return (
    <main className="bg-[#181a1d] text-white">
      <Navbar isBusy={true} page="enter" />
      <Container maxW={"container.xl"}>
        {/* <Metatags title="Enter" description="Sign up for this amazing app!" /> */}
        {user ? (
          !username ? (
            <UsernameForm />
          ) : (
            <UserProfile user={user} username={username} />
          )
        ) : (
          <SignInButton />
        )}
      </Container>
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const googleLogo =
    "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png";

  return (
    <div className="flex justify-center bg-[#181a1d] mt-10">
      <div
        onClick={signInWithGoogle}
        className="bg-white py-2 px-4 rounded-md cursor-pointer hover:translate-y-[1px] hover:opacity-75 group"
      >
        <div className="flex flex-row gap-2 items-center">
          <Image src={googleLogo} width="30px" />

          <p className="text-black">Sign in with Google</p>
        </div>
      </div>
    </div>
  );
}

// Sign out button
// function SignOutButton() {
//   return <button onClick={() => auth.signOut()}>Sign Out</button>;
// }

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) return <p>Checking...</p>;
  else if (isValid)
    return <p className="text-success">{username} is available!</p>;
  else if (username && !isValid)
    return <p className="text-danger">That username is taken!</p>;
  else return <p></p>;
}
