// "use client";
// import { useSession } from "next-auth/react";
// import { React, useEffect, useState } from "react";
// import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
// import Loading from "@/components/Loading";
// import Card from "@/components/ui/Card";
// // import { useSession } from "next-auth/react";

// const StarterPage = () => {
//   const { data: session } = useSession();
//   // console.log(session);
//   const [data, setData] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // const { data: session } = useSession();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/protected/buyers", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({}),
//         });
//         const json = await res.json();
//         setData(json);
//       } catch (error) {
//         setError(error);
//       } finally {
//         try {
//           const res = await fetch("/api/protected/bookings", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({}),
//           });
//           const json = await res.json();
//           setBookings(json);
//         } catch (error) {
//           setError(error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchData();
//   }, []);
//   //remove tickets with price 0
//   const filteredData = data.filter(ticket => ticket.price !== 0);

//   const totalTickets = filteredData.length;
//   const totalPrice = data.reduce((sum, ticket) => sum + ticket.price, 0);
//   const totalBookings = bookings.length;

//   const sellers = {};
//   let mostActiveSeller = null;
//   let maxTicketsSold = 0;

//   let earlybird = 0;
//   let firstrelease = 0;
//   let secondrelease = 0;
//   let scannedtickets = 0;

//   data.forEach((ticket) => {
//     if (!(ticket.price === 0)) {
//       const { seller, price } = ticket;
//       if (!sellers[seller]) {
//         sellers[seller] = 1;
//       } else {
//         sellers[seller]++;
//       }

//       if (sellers[seller] > maxTicketsSold) {
//         maxTicketsSold = sellers[seller];
//         mostActiveSeller = seller;
//       }

//       if (price === 10) {
//         earlybird++;
//       } else if (price === 40) {
//         secondrelease++;
//       }
//       if (ticket.status === "scanned") {
//         scannedtickets++;
//       }
      
//     }
//   });
//   console.log(sellers);
//   const rows = Object.entries(sellers).map(([name, tickets]) => ({
//     name,
//     tickets,
//   }));
//   const columns = [
//     {
//       label: "Name",
//       field: "name",
//     },

//     {
//       label: "Tickets",
//       field: "tickets",
//     },
//   ];

//   const statistics = [
//     {
//       title: "Bookings",
//       count: totalBookings,
//       bg: "bg-[#E5F9FF] dark:bg-slate-900	",
//       text: "text-info-500",
//       icon: "heroicons:calendar",
//     },
//     {
//       title: "Sold Tickets",
//       count: totalTickets,
//       bg: "bg-[#FFEDE6] dark:bg-slate-900	",
//       text: "text-warning-500",
//       icon: "heroicons:ticket",
//     },
//     {
//       title: "Total Revenue",
//       count: `${totalPrice} DT`,
//       bg: "bg-[#d4fff3] dark:bg-slate-900	",
//       text: "text-[#4E8074]",
//       icon: "heroicons:banknotes",
//     },

//     {
//       title: "Most Active Seller",
//       count: mostActiveSeller,
//       bg: "bg-[#EAE6FF] dark:bg-slate-900	",
//       text: "text-[#5743BE]",
//       icon: "heroicons:user-group",
//     },
//     {
//       title: "Early bird",
//       count: earlybird,
//       bg: "bg-[#EAE6FF] dark:bg-slate-900	",
//       text: "text-[#5743BE]",
//       icon: "heroicons:arrow-trending-up-solid",
//     },
//     {
//       title: "First release",
//       count: firstrelease,
//       bg: "bg-[#EAE6FF] dark:bg-slate-900	",
//       text: "text-[#5743BE]",
//       icon: "heroicons:arrow-trending-up-solid",
//     },
//     {
//       title: "Second release",
//       count: secondrelease,
//       bg: "bg-[#EAE6FF] dark:bg-slate-900	",
//       text: "text-[#5743BE]",
//       icon: "heroicons:arrow-trending-up-solid",
//     },
//     {
//       title: "Scanned tickets",
//       count: scannedtickets,
//       bg: "bg-[#EAE6FF] dark:bg-slate-900	",
//       text: "text-[#5743BE]",
//       icon: "heroicons:qr-code",
//     },
//   ];

//   // if (loading) return <Loading />;
//   // if (error) return "Error!";
//   console.log(data);
//   console.log(bookings);

//   return (
//     <>
//       <div className="grid grid-cols-full gap-5 mb-5">
//         <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
//           <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
//             <GroupChart2 statistics={statistics} />
//           </div>
//         </div>
//       </div>
//       <Card title="Sellers" noborder>
//         <div className="overflow-x-auto -mx-6">
//           <div className="inline-block min-w-full align-middle">
//             <div className="overflow-hidden ">
//               <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
//                 <thead className=" border-t border-slate-100 dark:border-slate-800">
//                   <tr>
//                     {columns.map((column, i) => (
//                       <th key={i} scope="col" className=" table-th ">
//                         {column.label}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
//                   {rows.map((row, i) => (
//                     <tr key={i}>
//                       <td className="table-td">{row.name}</td>
//                       <td className="table-td">{row.tickets}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </>
//   );
// };

// export default StarterPage;
"use client";
import { useSession } from "next-auth/react";
import { React, useEffect, useState } from "react";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import Loading from "@/components/Loading";
import Card from "@/components/ui/Card";
import axios from "axios";

const StarterPage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderRes = await axios.post("/api/orders/getallorders",{});
        console.log(orderRes.data.order)
        setOrders(orderRes.data.order);
        const productRes = await axios.post("/api/products/getAllProducts",{});
        console.log("productRes", productRes.data.products);
        setProducts(productRes.data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  // Calculate most sold product
  const productSales = {};
  products.forEach((product) => {
    productSales[product.title] = product.sold;
  });
  console.log("productSales", productSales);
  const mostSoldProduct = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])[0];
    console.log("mostSoldProduct", mostSoldProduct);

  // Calculate top 5 clients
  const clientOrders = {};
  orders.forEach((order) => {
    const { idUser } = order;
    if (!clientOrders[idUser]) {
      clientOrders[idUser] = 1;
    } else {
      clientOrders[idUser]++;
    }
  });
  const topClients = Object.entries(clientOrders)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, orders]) => ({ id, orders }));

  // const statistics = [
  //   { title: "Most Sold Product", count: `${mostSoldProduct[0]}: ${mostSoldProduct[1]}`, bg: "bg-[#EAE6FF] dark:bg-slate-900", text: "text-[#5743BE]", icon: "heroicons:shopping-cart" },
  //   { title: "Top 5 Clients", count: topClients.map(client => `${client.id}: ${client.orders}`).join(", "), bg: "bg-[#EAE6FF] dark:bg-slate-900", text: "text-[#5743BE]", icon: "heroicons:user" },
  // ];
  const statistics = [
    {
      title: "Most Sold Product",
      count: mostSoldProduct ? `${mostSoldProduct[0]}: ${mostSoldProduct[1]}` : "No data",
      bg: "bg-[#EAE6FF] dark:bg-slate-900",
      text: "text-[#5743BE]",
      icon: "heroicons:shopping-cart",
    },
    {
      title: "Top 5 Clients",
      count: topClients.map((client) => `${client.id}: ${client.orders}`).join(", "),
      bg: "bg-[#EAE6FF] dark:bg-slate-900",
      text: "text-[#5743BE]",
      icon: "heroicons:user",
    },
  ];
  if (loading) return <Loading />;
  if (error) return "Error!";

  return (
    <>
      <div className="grid grid-cols-full gap-5 mb-5">
        <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
            <GroupChart2 statistics={statistics} />
          </div>
        </div>
      </div>
      <Card title="Top Clients" noborder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className="border-t border-slate-100 dark:border-slate-800">
                  <tr>
                    <th scope="col" className="table-th">Client ID</th>
                    <th scope="col" className="table-th">Commandes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {topClients.map((client, i) => (
                    <tr key={i}>
                      <td className="table-td">{client.id}</td>
                      <td className="table-td">{client.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StarterPage;