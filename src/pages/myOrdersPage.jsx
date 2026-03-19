import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "../components/loadingAnimation";
import getFormatPrice from "../utils/price-format";
import CustomerViewOrderModal from "../components/CustomerViewOrderModal";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const loading = !isLoaded;

  const formatName = (value = "") =>
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

  useEffect(() => {
    if (!isLoaded) {
      const token = localStorage.getItem("token");
      axios
        .get(
          import.meta.env.VITE_API_URL +
            "/orders/" +
            pageSize +
            "/" +
            pageNumber,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        )
        .then((response) => {
          setOrders(response.data.orders);
          setTotalPages(response.data.totalPages);
          setIsLoaded(true);
        })
        .catch(() => {
          setOrders([]);
          setTotalPages(0);
          setIsLoaded(true);
        });
    }
  }, [isLoaded]);
  return (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col">
      <div className="w-full flex-1 flex flex-col min-h-0">
        {/* Table Container */}
        <div className="overflow-auto shadow-xl flex-1 min-h-0">
          {loading ? (
            <div className="w-full h-full flex flex-col  justify-center items-center">
              <LoadingAnimation />
              <h1 className=" text-xl mt-5 font-semibold text-secondary">
                Loading Orders...
              </h1>
            </div>
          ) : (
            <table className="w-full bg-white min-w-[1100px] relative table-fixed ">
              <thead>
                <tr className="bg-white border-b-2 border-accent">
                  <th className="sticky top-0 z-30 px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider bg-primary w-[10%]">
                    Order ID
                  </th>
                  <th className="sticky top-0 z-30 px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider bg-primary w-[15%]">
                    Customer
                  </th>
                  <th className="sticky top-0 z-30 px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider bg-primary w-[15%]">
                    Email
                  </th>
                  <th className="sticky top-0 z-30 px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider bg-primary w-[8%]">
                    Date
                  </th>
                  <th className="sticky top-0 z-30 px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider bg-primary w-[10%] align-middle">
                    Total
                  </th>

                  <th className="sticky top-0 z-30 px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider bg-primary w-[9%]">
                    Status
                  </th>
                  <th className="sticky top-0 z-30 px-6 py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider bg-primary w-[8%]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {orders.map((order, index) => {
                  return (
                    <tr
                      key={order.orderId}
                      className="odd:bg-accent/30 hover:bg-primary/90 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <span className=" text-[11px] font-mono font-medium text-secondary bg-accent/10 px-3 py-1 rounded-full break-words">
                          {order.orderId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[13px] font-semibold text-secondary break-words">
                          {`${formatName(order.firstName)} ${formatName(order.lastName)}`.trim()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[13px] text-secondary break-words">
                          {order.email}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[13px] font-medium text-secondary  break-words">
                          {new Date(order.date).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[13px] text-secondary break-words">
                          {getFormatPrice(order.total)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[13px] text-secondary break-words">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <CustomerViewOrderModal order={order} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="sticky bottom-0 z-20 flex items-center justify-center gap-4 py-4 bg-primary/95 border-t border-accent/20">
          <button
            className="px-4 py-2 rounded bg-secondary text-white disabled:opacity-50"
            disabled={pageNumber <= 1}
            onClick={() => {
              setPageNumber((prev) => prev - 1);
              setIsLoaded(false);
            }}
          >
            Previous
          </button>

          <span className="text-sm font-semibold text-secondary">
            Page {pageNumber} / {totalPages || 1}
          </span>

          <button
            className="px-4 py-2 rounded bg-secondary text-white disabled:opacity-50"
            disabled={pageNumber >= totalPages || totalPages === 0}
            onClick={() => {
              setPageNumber((prev) => prev + 1);
              setIsLoaded(false);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
