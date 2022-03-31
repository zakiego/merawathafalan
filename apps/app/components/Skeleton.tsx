export const Skeleton = () => {
  return <div className="skeleton my-1 h-5 w-full" />;
};

export const SkeletonTable = ({ amount }: { amount: number }) => {
  const loop = Array.from(Array(amount - 1).keys());

  return (
    <tr className="text-center">
      {loop.map((item: number) => {
        return (
          <td key={item} className="py-3">
            <div className="px-8">
              <Skeleton />
            </div>
          </td>
        );
      })}

      <td className="py-3">
        <div className="mx-auto w-16 rounded-lg py-[4px] text-sm">
          <Skeleton />
        </div>
      </td>
    </tr>
  );
};
