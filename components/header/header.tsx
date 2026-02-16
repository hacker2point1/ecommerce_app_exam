"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./header.module.css";

export default function Header() {
  const items = useSelector((state) => state.cart.items || []);
  const count = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        My Store
      </Link>

      <nav>
        <Link href="/cart" className={styles.navLink}>
          <span className={styles.cartWrapper}>
            <span className={styles.cartIcon}>🛒</span>
            {mounted && count > 0 && (
              <span className={styles.badge}>{count}</span>
            )}
          </span>
        </Link>
      </nav>
    </header>
  );
}







// "use client";

// import Link from "next/link";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";

// export default function Header() {
//   const items = useSelector((state) => state.cart.items || []);
//   const count = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid #e5e7eb" }}>
//       <Link href="/" style={{ fontSize: 18, fontWeight: 600, textDecoration: "none", color: "inherit" }}>
//         My Store
//       </Link>

//       <nav>
//         <Link href="/cart" style={{ textDecoration: "none", color: "inherit" }}>
//           <span style={{ position: "relative", display: "inline-block", padding: "6px 10px" }}>
//             <span style={{ fontSize: 20 }}>🛒</span>
//             {mounted && count > 0 && (
//               <span style={{
//                 position: "absolute",
//                 top: -6,
//                 right: -6,
//                 background: "#ef4444",
//                 color: "white",
//                 borderRadius: "999px",
//                 padding: "2px 6px",
//                 fontSize: 12,
//                 fontWeight: 700,
//               }}>{count}</span>
//             )}
//           </span>
//         </Link>
//       </nav>
//     </header>
//   );
// }
    


