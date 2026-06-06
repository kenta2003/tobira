import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Specified Commercial Transaction Act',
  description: 'Disclosures required under Japan\'s Act on Specified Commercial Transactions (特定商取引法) for tobira beyond tokyo.',
};

const rows: { label: string; value: React.ReactNode }[] = [
  { label: '販売業者', value: 'tobira beyond tokyo' },
  {
    label: '責任者名',
    value: '非公開（請求があり次第、遅滞なく開示いたします）',
  },
  {
    label: '所在地',
    value: '日本（詳細は請求があり次第、遅滞なく開示いたします）',
  },
  {
    label: '電話番号',
    value: (
      <>
        非公開（お問い合わせはメールにて受け付けております）
        <br />
        <a href="mailto:contact@tobira-travel.com" className="text-red-600 hover:underline">
          contact@tobira-travel.com
        </a>
      </>
    ),
  },
  {
    label: 'メールアドレス',
    value: (
      <a href="mailto:contact@tobira-travel.com" className="text-red-600 hover:underline">
        contact@tobira-travel.com
      </a>
    ),
  },
  {
    label: '販売価格',
    value: (
      <>
        <strong>Free プラン：</strong>無料
        <br />
        <strong>Pro プラン：</strong>$4.99 / 月（税込）
      </>
    ),
  },
  {
    label: '支払い方法',
    value: 'クレジットカード（Visa / Mastercard / American Express / JCB など）— Stripe により処理',
  },
  { label: '支払い時期', value: 'お申し込み時に即時決済。以降、毎月同日に自動更新' },
  {
    label: 'サービスの提供時期',
    value: '決済完了後、即時ご利用いただけます',
  },
  {
    label: '返品・キャンセルについて',
    value: (
      <>
        デジタルコンテンツの性質上、提供開始後の返金はお受けできません。
        <br />
        サブスクリプションはいつでもキャンセル可能です。キャンセル後も、当該請求期間の終了日までサービスをご利用いただけます。
        <br />
        キャンセルは{' '}
        <a href="/pricing" className="text-red-600 hover:underline">
          マイアカウント → プランの管理
        </a>{' '}
        から行えます。
      </>
    ),
  },
  {
    label: '動作環境',
    value: (
      <>
        モダンブラウザ最新版（Google Chrome / Safari / Mozilla Firefox / Microsoft Edge）
        <br />
        インターネット接続が必要です
      </>
    ),
  },
];

export default function TokushohoPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <p className="text-stone-400 text-sm font-medium tracking-widest uppercase mb-4">
          tobira beyond tokyo
        </p>
        <h1 className="text-4xl font-bold text-stone-900 mb-1">
          Specified Commercial Transaction Act
        </h1>
        <p className="text-stone-500 text-lg mb-2">特定商取引法に基づく表記</p>
        <p className="text-stone-400 text-sm mb-6">
          This page provides disclosures required under Japan&apos;s Act on Specified Commercial Transactions.
        </p>
        <p className="text-stone-500 text-xs mb-12">最終更新 / Last updated: 2026年2月</p>

        <div className="text-stone-600 leading-relaxed">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {rows.map(({ label, value }) => (
                <tr key={label} className="border-t border-stone-200">
                  <th className="text-left py-4 pr-6 align-top font-semibold text-stone-800 w-40 whitespace-nowrap">
                    {label}
                  </th>
                  <td className="py-4 text-stone-600 leading-relaxed">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <section className="mt-12 p-6 bg-stone-100 rounded-lg text-sm text-stone-600">
            <h2 className="font-semibold text-stone-800 mb-2">個人情報の非開示について</h2>
            <p>
              当サービスは個人が運営する独立プロジェクトです。責任者名・住所・電話番号については、
              プライバシー保護のため一般公開を控えております。特定商取引法第11条ただし書きに基づき、
              請求があり次第、遅滞なく開示いたします。
              お問い合わせは{' '}
              <a href="mailto:contact@tobira-travel.com" className="text-red-600 hover:underline">
                contact@tobira-travel.com
              </a>{' '}
              までメールにてご連絡ください。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
