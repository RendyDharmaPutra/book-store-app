import { memo } from "react";
import { idr } from "utils/methods";

const Amount = memo(({ amount }: { amount: number }) => {
  return (
    <>
      <input type="hidden" name="amount" value={amount} />
      <div className="md:self-end flex flex-row justify-start md:justify-center items-start  md:items-center gap-3  ">
        <h2 className=" text-gray-800 text-lg md:text-2xl">Total Harga : </h2>
        <h3 className="font-medium text-gray-800 text-lg md:text-2xl">
          {idr.format(amount)}
        </h3>
      </div>
    </>
  );
});

export default Amount;
