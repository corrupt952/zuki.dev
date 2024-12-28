import {
  List,
  ListItem,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import LinkText from './LinkText';
import ReactMarkdown from 'markdown-to-jsx';
import { JSX } from 'react';
import { Heading } from '../Typography';

const MarkdownList = styled(List)({
  listStyleType: 'circle',
});

const MarkdownListItem = styled(ListItem)({
  marginLeft: 16,
  paddingTop: 0,
  paddingBottom: 4,
  paddingLeft: 8,
  listStyle: 'circle',
  display: 'list-item',
});

const MarkdownTable = styled(Table)({
  width: '100%',
  marginBottom: 24,
});

const MarkdownParagraph = function (props: JSX.IntrinsicAttributes) {
  return (
    <Typography paragraph gutterBottom whiteSpace="break-spaces" {...props} />
  );
};

const options = {
  overrides: {
    h2: {
      component: (props: JSX.IntrinsicAttributes) => (
        <Typography variant="h4" gutterBottom {...props} />
      ),
    },
    h3: {
      component: (props: JSX.IntrinsicAttributes) => (
        <Typography variant="h5" gutterBottom {...props} />
      ),
    },
    p: {
      component: (props: JSX.IntrinsicAttributes) => (
        <MarkdownParagraph {...props} />
      ),
    },
    span: {
      component: (props: JSX.IntrinsicAttributes) => (
        <Typography component="span" display="block" {...props} />
      ),
    },
    a: {
      component: (props: JSX.IntrinsicAttributes) => (
        <LinkText
          {...props}
          className="text-primary-500 hover:text-primary-600"
        />
      ),
    },
    ul: {
      component: (props: JSX.IntrinsicAttributes) => (
        <MarkdownList {...props} />
      ),
    },
    li: {
      component: (props: JSX.IntrinsicAttributes) => (
        <MarkdownListItem>
          <Typography component="span" {...props} />
        </MarkdownListItem>
      ),
    },
    table: {
      component: (props: JSX.IntrinsicAttributes) => (
        <TableContainer>
          <MarkdownTable aria-label="simple table" {...props} />
        </TableContainer>
      ),
    },
    thead: {
      component: (props: JSX.IntrinsicAttributes) => <TableHead {...props} />,
    },
    tbody: {
      component: (props: JSX.IntrinsicAttributes) => <TableBody {...props} />,
    },
    tr: {
      component: (props: JSX.IntrinsicAttributes) => <TableRow {...props} />,
    },
    th: {
      component: (props: JSX.IntrinsicAttributes) => <TableCell {...props} />,
    },
    td: {
      component: (props: JSX.IntrinsicAttributes) => <TableCell {...props} />,
    },
  },
};

type MarkdownProps = {
  markdown: string;
};

export const Markdown = ({ markdown }: MarkdownProps) => {
  return <ReactMarkdown options={options}>{markdown}</ReactMarkdown>;
};
