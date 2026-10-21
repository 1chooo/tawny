import { CUSTOMERS } from "@/components/jane/sales";

export function CustomersTable() {
  const customerCount = CUSTOMERS.filter((person) => person.role !== "admin").length;
  const confirmed = CUSTOMERS.filter((person) => person.confirmed).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs tracking-wider text-muted-foreground uppercase">
        <span>{CUSTOMERS.length} accounts</span>
        <span>{customerCount} customers</span>
        <span>{confirmed} confirmed</span>
      </div>
      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-foreground">
            <tr className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              <th scope="col" className="px-5 py-3 font-normal">
                Account
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Role
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Joined
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Last sign-in
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((person) => (
              <tr key={person.id} className="border-b border-border last:border-0">
                <td className="px-5 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{person.name}</span>
                      {person.internal ? (
                        <span className="bg-primary px-2 py-0.5 font-mono text-[11px] text-primary-foreground uppercase">
                          Internal
                        </span>
                      ) : null}
                    </span>
                    {person.handle ? (
                      <span className="font-mono text-xs text-muted-foreground">
                        @{person.handle}
                      </span>
                    ) : null}
                    <span className="font-mono text-xs text-muted-foreground">
                      {person.email}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={
                      person.role === "admin"
                        ? "bg-primary px-2 py-0.5 font-mono text-[11px] text-primary-foreground uppercase"
                        : "bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground uppercase"
                    }
                  >
                    {person.role === "admin" ? "Admin" : "Customer"}
                  </span>
                </td>
                <td className="px-5 py-3 font-mono text-xs tabular-nums">
                  {person.joined}
                </td>
                <td className="px-5 py-3 font-mono text-xs tabular-nums">
                  {person.lastSignIn}
                </td>
                <td className="px-5 py-3 text-muted-foreground">
                  {person.confirmed ? "Confirmed" : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
