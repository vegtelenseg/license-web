import { Card, Avatar } from "antd";
import { useGetDriverQuery } from "../generated/graphql";
import { Tabs } from "../components/Tabs/Tabs";
interface ProfileCardProps {
  avatarUrl?: string;
  name: string;
  surname: string;
}

export const ProfileCard = ({
  avatarUrl = "https://via.placeholder.com/150",
  name,
  surname,
}: ProfileCardProps) => {
  const { data } = useGetDriverQuery({
    variables: {
      id: "1",
    },
  });
  console.log("DATA: ", data);
  const { Meta } = Card;
  return (
    <>
      <Tabs />
    </>
  );
};
