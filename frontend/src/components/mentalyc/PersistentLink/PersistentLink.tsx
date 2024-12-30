import { Link, useLocation, LinkProps } from "react-router-dom";

//  links that preserve search params
export default function PersistentLink({ children, to, ...props }: LinkProps) {
  let location = useLocation();

  let linkTo = to + location.search;

  return (
    <Link {...props} to={linkTo}>
      {children}
    </Link>
  );
}
