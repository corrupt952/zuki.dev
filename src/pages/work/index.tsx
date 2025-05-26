import { Markdown } from '@/components/Elements/Markdown';
import { Heading } from '@/components/Typography/Heading';
import { Body } from '@/components/Typography/Body';
import { useTranslation } from '@/libs/i18n';
import Head from 'next/head';

const BodyHeader = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl mb-4 brightness-200">{children}</h3>
);

function ContentArea() {
  const { t } = useTranslation('pages.work.contents');
  const menus = t('support.menus', { returnObjects: true });

  return (
    <section className="mb-16">
      <Heading>{t('title')}</Heading>
      <div className="mt-6">
        <BodyHeader>{t('support.title')}</BodyHeader>
        {t('support.descriptions', { returnObjects: true }).map(
          (desc: string) => (
            <p className="mb-4" key={desc}>
              <Markdown markdown={desc} />
            </p>
          ),
        )}
        <ul className="list-disc pl-6 mt-4">
          {menus.map((menu: string) => (
            <li className="mb-2" key={menu}>
              <Body>{menu}</Body>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <BodyHeader>{t('consultation.title')}</BodyHeader>
        {t('consultation.descriptions', { returnObjects: true }).map(
          (desc: string) => (
            <p className="mb-4" key={desc}>
              <Markdown markdown={desc} />
            </p>
          ),
        )}
      </div>
    </section>
  );
}

function PricingArea() {
  const { t } = useTranslation('pages.work.pricing');

  return (
    <section className="mb-16">
      <Heading>{t('title')}</Heading>
      <div className="mt-6">
        {t('descriptions', { returnObjects: true }).map((desc: string) => (
          <p className="mb-4" key={desc}>
            <Markdown markdown={desc} />
          </p>
        ))}
        <div className="overflow-x-auto mt-6">
          <table className="w-full table-auto border-collapse text-white">
            <thead>
              <tr className="border-b border-gray-600">
                {t('menus.headers', { returnObjects: true }).map(
                  (header: string) => (
                    <th className="px-4 py-3" key={header}>
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {t('menus.rows', { returnObjects: true }).map(
                (row: { [key: string]: string }) => (
                  <tr key={row.name} className="border-b border-gray-600">
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3">{row.unit}</td>
                    <td className="px-4 py-3 text-right">{row.price}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
        <ul className="pl-6 mt-6">
          {t('menus.notes', { returnObjects: true }).map((note: string) => (
            <li className="mb-2" key={note}>
              <Body>{note}</Body>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function InquiryArea() {
  const { t } = useTranslation('pages.work.inquiry');

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      className="w-full mb-4 p-2 border border-gray-600 bg-background rounded-sm focus:outline-none focus:border-primary-700"
    />
  );
  const Textarea = (
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  ) => (
    <textarea
      {...props}
      className="w-full mb-4 p-2 border border-gray-600 bg-background rounded-sm focus:outline-none focus:border-primary-700"
    />
  );

  return (
    <section className="mb-16">
      <Heading>{t('title')}</Heading>
      <div className="mt-6">
        {t('descriptions', { returnObjects: true }).map((desc: string) => (
          <p className="mb-4" key={desc}>
            <Markdown markdown={desc} />
          </p>
        ))}
        <form
          id="form"
          method="POST"
          action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdnIxC9Bk0jeQ6Qfj_fWDt6MbS4uqwE38Jpx4CUvs-dgPCZdA/formResponse"
          className="w-full py-2 flex flex-col items-center mt-6"
        >
          <Input name="entry.772574949" placeholder={t('form.name')} required />
          <Input
            name="entry.1315418939"
            placeholder={t('form.email')}
            type="email"
            required
          />
          <Textarea
            name="entry.1404312101"
            placeholder={t('form.subject')}
            rows={3}
            required
          />
          <Textarea
            name="entry.745112553"
            placeholder={t('form.content')}
            rows={5}
            required
          />
          <button
            type="submit"
            className="mt-6 px-6 py-2 rounded bg-primary-600 text-white uppercase hover:bg-primary-700 transition-colors"
          >
            {t('form.submit')}
          </button>
        </form>
      </div>
    </section>
  );
}

export default function Work() {
  const { t } = useTranslation('pages.work');

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
      </Head>

      <article>
        {t('descriptions', { returnObjects: true }).map((desc: string) => (
          <p className="mb-4" key={desc}>
            <Markdown markdown={desc} />
          </p>
        ))}

        <div className="h-12" />
        <ContentArea />
        <div className="h-12" />
        <PricingArea />
        <div className="h-12" />
        <InquiryArea />
      </article>
    </>
  );
}
