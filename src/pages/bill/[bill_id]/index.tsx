import { useRouter } from 'next/router';

const BillPage = () => {
  const router = useRouter();
  const { bill_id } = router.query;

  return (
    <div>
      <h1>Bill {bill_id}</h1>
    </div>
  )
}
export default BillPage;