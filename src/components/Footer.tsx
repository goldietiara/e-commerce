import { SiGmail } from "react-icons/si";
import { TfiLinkedin } from "react-icons/tfi";
import { TbBrandGithubFilled } from "react-icons/tb";

export default function Footer() {
  return (
    <footer className=" mt-10 bg-neutral p-10 text-neutral-content">
      <div className="footer m-auto max-w-7xl">
        <div>
          <div className=" flex gap-5">
            <a
              className="link-hover link shrink-0 bg-white p-1 text-lg text-neutral"
              href={`mailto:goldietiara.acc@gmail.com`}
            >
              <SiGmail />
            </a>
            <a
              className="link-hover link shrink-0 bg-white p-1 text-lg text-neutral"
              href={`https://www.linkedin.com/in/goldie-tiara-putri-900733196`}
              target="_blank"
            >
              <TfiLinkedin />
            </a>
            <a
              className="link-hover link shrink-0 bg-white p-1 text-lg text-neutral"
              href={`https://github.com/goldietiara`}
              target="_blank"
            >
              <TbBrandGithubFilled />
            </a>
          </div>
        </div>

        <a className="link-hover link">
          © 2023 Goldie Tiara. All rights reserved.
        </a>
      </div>
    </footer>
  );
}
