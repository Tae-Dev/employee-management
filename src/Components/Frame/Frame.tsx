import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Content, DOMHelper, Nav, Sidebar, Sidenav } from "rsuite";
import Header from "../Header/Header";
import NavLink from "./NavLink";
import NavToggle from "./NavToggle";

const { getHeight, on } = DOMHelper;

const NavItem = (props: any) => {
  const { title, eventKey, ...rest } = props;
  return (
    <Nav.Item eventKey={eventKey} as={NavLink} {...rest}>
      {title}
    </Nav.Item>
  );
};

export interface NavItemData {
  eventKey: string;
  title: string;
  icon?: any;
  to?: string;
  target?: string;
  children?: NavItemData[];
}

export interface FrameProps {
  navs: NavItemData[];
  children?: React.ReactNode;
}

const Frame = (props: FrameProps) => {
  const { navs } = props;
  const [expand, setExpand] = useState(true);
  const [windowHeight, setWindowHeight] = useState(getHeight(window));

  useEffect(() => {
    setWindowHeight(getHeight(window));
    const resizeListenner = on(window, "resize", () =>
      setWindowHeight(getHeight(window))
    );

    return () => {
      resizeListenner.off();
    };
  }, []);

  const navBodyStyle: React.CSSProperties = expand
    ? { height: windowHeight - 100 }
    : { height: windowHeight - 100 };

  return (
    <Container className="fixed w-full">
      <Sidebar
        style={{ display: "flex", flexDirection: "column" }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav.Header>
          {expand ? (
            <div className="flex items-center gap-1 text-lg font-semibold text-gray-900 dark:text-white p-2 pl-3">
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              <div className="text-black">User</div>
              <div className="text-black">management</div>
            </div>
          ) : (
            <h2 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white p-2 pl-3">
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
            </h2>
          )}
        </Sidenav.Header>
        <Sidenav expanded={expand} appearance="subtle" defaultOpenKeys={["2"]}>
          <Sidenav.Body style={navBodyStyle}>
            <Nav>
              {navs.map((item) => {
                const { children, ...rest } = item;
                if (children) {
                  return (
                    <Nav.Menu
                      key={item.eventKey}
                      placement="rightStart"
                      trigger="hover"
                      {...rest}
                    >
                      {children.map((child) => {
                        return <NavItem key={child.eventKey} {...child} />;
                      })}
                    </Nav.Menu>
                  );
                }

                if (rest.target === "_blank") {
                  return (
                    <Nav.Item key={item.eventKey} {...rest}>
                      {item.title}
                    </Nav.Item>
                  );
                }

                return <NavItem key={rest.eventKey} {...rest} />;
              })}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </Sidebar>

      <Container>
        <Header />
        <Content style={{ backgroundColor: "#e7e7f0" }}>
          <Outlet />
        </Content>
      </Container>
    </Container>
  );
};

export default Frame;
