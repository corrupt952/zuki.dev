import LinkText from './LinkText';
import ReactMarkdown from 'markdown-to-jsx';

type OverrideProps = React.HTMLAttributes<HTMLElement> & { href?: string };

const options = {
  overrides: {
    h2: {
      component: (props: OverrideProps) => (
        <h2 className="text-2xl font-bold mb-4" {...props} />
      ),
    },
    h3: {
      component: (props: OverrideProps) => (
        <h3 className="text-xl font-bold mb-3" {...props} />
      ),
    },
    p: {
      component: (props: OverrideProps) => (
        <p className="mb-6 whitespace-pre-wrap" {...props} />
      ),
    },
    span: {
      component: (props: OverrideProps) => (
        <span className="block" {...props} />
      ),
    },
    a: {
      component: (props: OverrideProps) => (
        <LinkText
          {...props}
          href={props.href || ''}
          className="text-primary-500 hover:text-primary-600"
        />
      ),
    },
    ul: {
      component: (props: OverrideProps) => (
        <ul className="list-disc pl-5 mb-6" {...props} />
      ),
    },
    li: {
      component: (props: OverrideProps) => (
        <li className="mb-1">
          <span {...props} />
        </li>
      ),
    },
    table: {
      component: (props: OverrideProps) => (
        <div className="overflow-x-auto mb-6">
          <table className="w-full" {...props} />
        </div>
      ),
    },
    thead: {
      component: (props: OverrideProps) => (
        <thead className="bg-gray-50" {...props} />
      ),
    },
    tbody: {
      component: (props: OverrideProps) => <tbody {...props} />,
    },
    tr: {
      component: (props: OverrideProps) => <tr {...props} />,
    },
    th: {
      component: (props: OverrideProps) => (
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          {...props}
        />
      ),
    },
    td: {
      component: (props: OverrideProps) => (
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
