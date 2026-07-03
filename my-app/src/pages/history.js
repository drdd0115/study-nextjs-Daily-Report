import Table from "@/components/Table/Table";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reports"));
        const historyData = [];

        querySnapshot.forEach((doc) => {
          const d = doc.data();
          // date パースは既に実装済みの方法を使う
          let dateStr = "";
          let timeStr = "";
          if (d.date && typeof d.date.toDate === "function") {
            const dateObj = d.date.toDate();
            dateStr = dateObj.toISOString().split("T")[0];
            timeStr = dateObj
              .toISOString()
              .split("T")[1]
              .slice(0, 8)
              .replace(/:/g, "");
          }
          historyData.push({
            id: doc.id,
            date: dateStr,
            time: timeStr,
            name: d.name ?? "",
            task: d.task ?? "",
            comment: d.comment ?? "",
          });
        });

        if (cancelled) return;
        // 明示的にマイクロタスクに回すことで effect の同期実行中に setState しない
        Promise.resolve().then(() => {
          if (!cancelled) setData(historyData);
        });
      } catch (err) {
        console.error("fetchData error:", err);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Table data={data} />
    </>
  );
}
