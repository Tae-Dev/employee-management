import { useEffect, useRef } from 'react';
import {
  Avatar, Dropdown,
  Popover, Stack, Whisper,
  WhisperInstance
} from 'rsuite';
import { useAuth } from '../../Contexts/AuthContext';


const Header = () => {
  const trigger = useRef<WhisperInstance>(null);
  const { onLogout, user } = useAuth()

  const renderAdminSpeaker = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = (eventKey: any) => {
      onClose();
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
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="@simonguo"
          style={{ marginLeft: 8 }}
        />
      </Whisper>
    </Stack>
  );
};

export default Header;