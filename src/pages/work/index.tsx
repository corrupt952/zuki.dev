import { Markdown } from '@/components/Elements/Markdown';
import { Heading } from '@/components/Typography/Heading';
import { Body } from '@/components/Typography/Body';
import { useTranslation } from '@/libs/i18n';

const BodyHeader = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl mb-2 brightness-200">{children}</h3>
);

function ContentArea() {
  const { t } = useTranslation('pages.work.contents');
  const menus = t('support.menus', { returnObjects: true });

  return (
    <>
      <Heading>{t('title')}</Heading>
      <BodyHeader>{t('support.title')}</BodyHeader>
      {t('support.descriptions', { returnObjects: true }).map(
        (desc: string) => (
          <p className="mb-2" key={desc}>
            <Markdown markdown={desc} />
          </p>
        ),
      )}
      <ul className="list-disc pl-6">
        {menus.map((menu: string) => (
          <li className="mb-1" key={menu}>
            <Body>{menu}</Body>
          </li>
        ))}
      </ul>

      <BodyHeader>{t('consultation.title')}</BodyHeader>
      {t('consultation.descriptions', { returnObjects: true }).map(
        (desc: string) => (
          <p className="mb-2" key={desc}>
            <Markdown markdown={desc} />
          </p>
        ),
      )}
    </>
  );
}

function PricingArea() {
  const { t } = useTranslation('pages.work.pricing');

  return (
    <>
      <Heading>{t('title')}</Heading>
      {t('descriptions', { returnObjects: true }).map((desc: string) => (
        <p className="mb-2" key={desc}>
          <Markdown markdown={desc} />
        </p>
      ))}
      <table className="w-full table-auto border-collapse text-white">
        <thead>
          <tr className="border-b border-gray-600">
            {t('menus.headers', { returnObjects: true }).map(
              (header: string) => (
                <th className="px-4 py-2" key={header}>
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
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.unit}</td>
                <td className="px-4 py-2 text-right">{row.price}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <ul className="pl-6">
        {t('menus.notes', { returnObjects: true }).map((note: string) => (
          <li className="mb-1" key={note}>
            <Body>{note}</Body>
          </li>
        ))}
      </ul>
    </>
  );
}

function InquiryArea() {
  const { t } = useTranslation('pages.work.inquiry');

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      className="w-full mb-2 p-2 border border-gray-600 bg-background rounded-sm focus:outline-none focus:border-primary-700"
    />
  );
  const Textarea = (
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  ) => (
    <textarea
      {...props}
      className="w-full mb-2 p-2 border border-gray-600 bg-background rounded-sm focus:outline-none focus:border-primary-700"
    />
  );

  return (
    <>
      <Heading>{t('title')}</Heading>
      {t('descriptions', { returnObjects: true }).map((desc: string) => (
        <p className="mb-2" key={desc}>
          <Markdown markdown={desc} />
        </p>
      ))}
      <form
        id="form"
        method="POST"
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdnIxC9Bk0jeQ6Qfj_fWDt6MbS4uqwE38Jpx4CUvs-dgPCZdA/formResponse"
        className="w-full py-2 flex flex-col items-center"
      >
        <Input name="entry.772574949" placeholder={t('form.name')} />
        <Input name="entry.1315418939" placeholder={t('form.email')} />
        <Textarea
          name="entry.1404312101"
          placeholder={t('form.subject')}
          rows={3}
        />
        <Textarea
          name="entry.745112553"
          placeholder={t('form.content')}
          rows={5}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 rounded bg-primary-600 text-white uppercase"
        >
          {t('form.submit')}
        </button>
      </form>
    </>
  );
}

export default function Work() {
  const { t } = useTranslation('pages.work');

  return (
    <>
      {t('descriptions', { returnObjects: true }).map((desc: string) => (
        <p className="mb-2" key={desc}>
          <Markdown markdown={desc} />
        </p>
      ))}

      <div className="h-12" />
      <ContentArea />
      <div className="h-12" />
      <PricingArea />
      <div className="h-12" />
      <InquiryArea />
    </>
  );
}
