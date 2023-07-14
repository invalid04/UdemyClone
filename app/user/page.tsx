import ProfileComponent from "./ProfileComponent";
import myUser from "../actions/getUser";

export default async function page() {

    const user = await myUser();

  return (
      <ProfileComponent
        name={user?.name}
        email={user?.email}
        userId={user?.id}
      />
  )
}
