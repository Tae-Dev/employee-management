import React, { useEffect, useRef } from 'react';
import {
  Dropdown,
  Popover,
  Whisper,
  WhisperInstance,
  Stack,
  Badge,
  Avatar,
  IconButton,
  List,
  Button
} from 'rsuite';
import NoticeIcon from '@rsuite/icons/Notice';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import GithubIcon from '@rsuite/icons/legacy/Github';
import HeartIcon from '@rsuite/icons/legacy/HeartO';
import { useAuth } from '../../../Contexts/AuthContext';


const Header = () => {
  const trigger = useRef<WhisperInstance>(null);
  const { onLogout, user } = useAuth()

  useEffect(() => {
    console.log("user", user);
    
  }, [user])
  

  const renderAdminSpeaker = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = (eventKey: any) => {
      onClose();
      console.log(eventKey);
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
            <p>Signed in as</p>
            <strong>{user?.role}</strong>
          </Dropdown.Item>
          <Dropdown.Item divider />
          <Dropdown.Item onClick={onLogout}>Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };
  

  return (
    <Stack className="flex justify-end p-2" spacing={8}>
      <Whisper placement="bottomEnd" trigger="click" ref={trigger} speaker={renderAdminSpeaker}>
        <Avatar
          size="sm"
          circle
          src="https://avatars.githubusercontent.com/u/1203827"
          alt="@simonguo"
          style={{ marginLeft: 8 }}
        />
      </Whisper>
    </Stack>
  );
};

export default Header;