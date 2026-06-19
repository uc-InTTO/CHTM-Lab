import { getAllNotifications, type Notification } from "../../lib/data";

function groupByPeriod(notifications: Notification[]): Record<string, Notification[]> {
  return notifications.reduce<Record<string, Notification[]>>((acc, n) => {
    if (!acc[n.group]) acc[n.group] = [];
    acc[n.group].push(n);
    return acc;
  }, {});
}

export default async function LmoNotificationsPage() {
  const notifications = await getAllNotifications();
  const groups = groupByPeriod(notifications);
  const groupKeys = Object.keys(groups);

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your notifications</p>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
          <p className="text-sm">No notifications</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {groupKeys.map((group) => (
            <div key={group}>
              <p className="text-xs font-semibold tracking-wider text-gray-400 mb-3">{group}</p>
              <div className="flex flex-col gap-2">
                {groups[group].map((n) => (
                  <div key={n.id} className="bg-white rounded-2xl px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: "#dbeafe", color: "#3b82f6" }}
                      >
                        {n.audience}
                      </span>
                      <span className="text-xs text-gray-400">{n.time}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{n.sender}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
