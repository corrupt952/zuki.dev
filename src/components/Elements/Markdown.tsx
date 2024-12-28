import LinkText from './LinkText';
import ReactMarkdown from 'markdown-to-jsx';
import { JSX } from 'react';

const MarkdownParagraph = function (props: JSX.IntrinsicAttributes) {
  return <p className="mb-6 whitespace-pre-wrap" {...props} />;
};

const options = {
  overrides: {
    h2: {
      component: (props: JSX.IntrinsicAttributes) => (
        <h2 className="text-2xl font-bold mb-4" {...props} />
      ),
    },
    h3: {
      component: (props: JSX.IntrinsicAttributes) => (
        <h3 className="text-xl font-bold mb-3" {...props} />
      ),
    },
    p: {
      component: (props: JSX.IntrinsicAttributes) => (
        <MarkdownParagraph {...props} />
      ),
    },
    span: {
      component: (props: JSX.IntrinsicAttributes) => (
        <span className="block" {...props} />
      ),
    },
    a: {
      component: (props: JSX.IntrinsicAttributes) => (
        <LinkText
          {...props}
          href={(props as { href: string }).href || ''}
          className="text-primary-500 hover:text-primary-600"
        />
      ),
    },
    ul: {
      component: (props: JSX.IntrinsicAttributes) => (
        <ul className="list-disc pl-5 mb-6" {...props} />
      ),
    },
    li: {
      component: (props: JSX.IntrinsicAttributes) => (
        <li className="mb-1">
          <span {...props} />
        </li>
      ),
    },
    table: {
      component: (props: JSX.IntrinsicAttributes) => (
        <div className="overflow-x-auto mb-6">
          <table className="w-full" {...props} />
        </div>
      ),
    },
    thead: {
      component: (props: JSX.IntrinsicAttributes) => (
        <thead className="bg-gray-50" {...props} />
      ),
    },
    tbody: {
      component: (props: JSX.IntrinsicAttributes) => <tbody {...props} />,
    },
    tr: {
      component: (props: JSX.IntrinsicAttributes) => <tr {...props} />,
    },
    th: {
      component: (props: JSX.IntrinsicAttributes) => (
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          {...props}
        />
      ),
    },
    td: {
      component: (props: JSX.IntrinsicAttributes) => (
        <td className="px-6 py-4 whitespace-nowrap" {...props} />
      ),
    },
  },
};

type MarkdownProps = {
  markdown: string;
};

export const Markdown = ({ markdown }: MarkdownProps) => {
  return <ReactMarkdown options={options}>{markdown}</ReactMarkdown>;
};
