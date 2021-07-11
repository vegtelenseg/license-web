import React from "react";
import { Badge, Tabs as AntTabs, WhiteSpace } from "antd-mobile";

const tabs = [
  { title: <Badge text={"3"}>First Tabs</Badge> },
  { title: <Badge text={"今日(20)"}>Second Tabs</Badge> },
  { title: <Badge dot>Third Tabs</Badge> },
];

const tabs2 = [
  { title: "First Tab", sub: "1" },
  { title: "Second Tab", sub: "2" },
  { title: "Third Tab", sub: "3" },
];

export const Tabs = () => (
  <div>
    <AntTabs
      tabs={tabs}
      initialPage={1}
      onChange={(tab, index) => {
        console.log("onChange", index, tab);
      }}
      onTabClick={(tab, index) => {
        console.log("onTabClick", index, tab);
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "150px",
          backgroundColor: "#fff",
        }}
      >
        Content of first tab
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "150px",
          backgroundColor: "#fff",
        }}
      >
        Content of second tab
      </div>
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
