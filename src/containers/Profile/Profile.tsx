import { Badge, Card, Tabs as AntTabs, WhiteSpace } from "antd-mobile";
import { Avatar, Button } from "antd";
import { GetDriverByIdNumberQuery } from "../../generated/graphql";
import avatar from "../../assets/images/avatar.jpeg";
import "./profile.css";

export const Profile = ({ data }: { data: GetDriverByIdNumberQuery }) => {
  if (data && data.getDriverByIdNumber) {
    const { getDriverByIdNumber: user } = data;
    const tabs = [
      { title: <Badge text={""}>Driver Details</Badge> },
      { title: <Badge text={user?.fines?.length}>Fines</Badge> },
      { title: <Badge>Violations</Badge> },
    ];
    const licenseStatus = user?.licenseStatus?.status;
    const pdpStatus = user?.pdpStatus?.status;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            maxWidth: "350px",
            maxHeight: "350px",
            width: "auto",
            height: "auto",
          }}
          src={avatar}
        />
        <div className='profileOverview'>
          <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
          <h2>{user?.licenseNumber}</h2>
        </div>
        <br />
        <br />
        <AntTabs
          tabs={tabs}
          initialPage={1}
          // onChange={(tab, index) => {
          //   console.log("onChange", index, tab);
          // }}
          onTabClick={(tab, index) => {
            console.log("onTabClick", index, tab);
          }}
        >
          <Card
            full
            style={{
              width: "calc(100% - 30px)",
              margin: "0 auto",
              border: "1px solid #108ee9",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Card.Header title='Name' extra={<span>{user?.firstName}</span>} />
            <Card.Header
              title='Surname'
              extra={<span>{user?.lastName}</span>}
            />
            <Card.Header title='D.O.B' extra={<span>{user?.dob}</span>} />
            <Card.Header
              title='License number'
              extra={<span>{user?.licenseNumber}</span>}
            />
            <Card.Header
              title='License status'
              extra={
                <Button
                  type={licenseStatus === "ACTIVE" ? "primary" : "ghost"}
                  danger={licenseStatus !== "ACTIVE"}
                >
                  {user?.licenseStatus?.status}
                </Button>
              }
            />
            <Card.Header
              title='PDP status'
              extra={
                <Button
                  type={pdpStatus === "ACTIVE" ? "primary" : "ghost"}
                  danger={pdpStatus !== "ACTIVE"}
                >
                  {user?.pdpStatus?.status}
                </Button>
              }
            />

            <Card.Header title='Email' extra={user?.email} />
          </Card>
          {user?.fines?.map((fine, idx) => (
            <>
              <Card
                full
                key={fine?.reason ?? idx}
                style={{
                  width: "calc(100% - 30px)",
                  margin: "0 auto",
                  border: "1px solid #108ee9",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              >
                <Card.Header title='Reason' extra={fine?.reason} />
                <Card.Header title='Amount' extra={`R ${fine?.amount}`} />
                <Card.Header
                  title='Date Issued'
                  extra={new Date(fine?.created_at).toLocaleDateString()}
                />
                <Card.Header title='Date Due' extra={fine?.dueDate} />
                <Card.Header
                  title='Status'
                  extra={
                    <Button
                      type={fine?.status === "UNPAID" ? "ghost" : "primary"}
                      size='small'
                      danger={fine?.status === "UNPAID"}
                    >
                      {fine?.status}
                    </Button>
                  }
                />
              </Card>
            </>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#fff",
            }}
          >
            Content of third tab
          </div>
        </AntTabs>
        <WhiteSpace />
      </div>
    );
  } else {
    return null;
  }
};
// };
