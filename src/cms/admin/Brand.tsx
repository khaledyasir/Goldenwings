/* eslint-disable @next/next/no-img-element -- Payload admin graphics are rendered outside next/image's pipeline */

/** Login screen logo: the white-text site logo on a navy badge, readable in light and dark mode */
export function Logo() {
  return (
    <div className="gw-logo">
      <img src="/logo-header.png" alt="Golden Wings" width={1212} height={573} />
      <span>لوحة التحكم · Admin</span>
    </div>
  );
}

/** Small mark in the admin header (navy square, gold wing) */
export function Icon() {
  return <img src="/icon.png" alt="Golden Wings" width={28} height={28} style={{ borderRadius: 6, display: "block" }} />;
}
