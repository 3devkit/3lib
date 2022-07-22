import React from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import {
  ExPopoverBox,
  ExDialogBox,
  ExModalProvider,
  ExPopover,
  useModalAction,
  ExButton,
  ExLoading,
} from '@3lib/components';
import styles from './index.module.scss';

export default function Page() {
  return <PageConnent />;
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutConnent>{page}</LayoutConnent>;
};

function LayoutConnent(props: React.PropsWithChildren<unknown>) {
  return <ExModalProvider>{props.children}</ExModalProvider>;
}

function PageConnent() {
  return (
    <Container>
      <Stack gap={3} direction="horizontal">
        <TestDialog />
        <TesPopover />
        <ExButton>Button</ExButton>
        <ExButton loading={true}>Hello</ExButton>
        <ExLoading />
      </Stack>
    </Container>
  );
}

function TestDialog() {
  const { openDialog } = useModalAction();

  return (
    <Button
      onClick={() => {
        openDialog(
          <ExDialogBox className={styles.Dialog} title={'Title'}>
            <div className={styles.context}>content</div>
          </ExDialogBox>,
        );
      }}
    >
      Open Dialog
    </Button>
  );
}

function TesPopover() {
  return (
    <>
      <ExPopover
        onButtonBuilder={function (open: boolean) {
          return <Button>Open Popover</Button>;
        }}
        onPopoverBuilder={function (closeHandle) {
          return (
            <ExPopoverBox className={styles.Popover}>
              <div className={styles.item}>item1</div>
              <div className={styles.item}>item2</div>
              <div className={styles.item}>item3</div>
            </ExPopoverBox>
          );
        }}
      ></ExPopover>
    </>
  );
}
