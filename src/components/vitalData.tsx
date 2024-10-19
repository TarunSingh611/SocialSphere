
import { OwnerData } from "@/utils/types";
import { getHome } from "@/frameworks/owner/ownerProfile";

export default async function VitalData() {

let ownerData: OwnerData 
const renderKeyValuePairs = (data: OwnerData | null, indentLevel: number = 0) => {
  if (!data) return null;
  const indent :number = indentLevel*4

  return (
      <ul>
          {Object.entries(data).map(([key, value]) => (
              <li key={key} className="text-green-500">
                  <strong>{'-'.repeat(indent) + key}: </strong>
                  {typeof value === "object" ? (
                      renderKeyValuePairs(value, indentLevel + 1)
                  ) : (
                      <span>{value}</span>
                  )}
              </li>
          ))}
      </ul>
  );
}
try {
   ownerData = await getHome();
} catch (error) {
  console.error("Error fetching owner data:", error);
}

return (
    <div className="flex flex-col items-center justify-center">
    {ownerData && <>{renderKeyValuePairs(ownerData)}</>}
</div>
)
}