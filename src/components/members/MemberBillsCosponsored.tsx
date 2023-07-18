

const MemberBillsCosponsored = ({memberBillsCosponsoredData}) => {

  console.log(memberBillsCosponsoredData.results[0].bills[0]);
  const bills = memberBillsCosponsoredData.results[0].bills
  return(
    <div>
      {bills && bills.map((bill)=> (
        <div key={bill.bill_id}>
          <h3>{bill.title}</h3>
        </div>
      ))}
    </div>
  )
}
export default MemberBillsCosponsored;