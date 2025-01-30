"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import type { components } from "@/lib/backend/apiV1/schema";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

function PaginationType1({
  className,
  baseQueryString,
  totalPages,
  currentPageNumber,
}: {
  className?: string;
  baseQueryString: string;
  totalPages: number;
  currentPageNumber: number;
}) {
  // armSize : 현재 중심 페이지 버튼의 좌측(혹은 우측)으로 나올 수 있는 페이지 버튼 수
  const paginationArmSize = 1;
  const pageButtonUrl = (pageNumber: number) =>
    `?page=${pageNumber}&${baseQueryString}`;
  const prevEllipsisButtonPageNumber =
    currentPageNumber - paginationArmSize - 1 > 1
      ? currentPageNumber - paginationArmSize - 1
      : undefined;
  const nextEllipsisButtonPageNumber =
    currentPageNumber + paginationArmSize + 1 < totalPages
      ? currentPageNumber + paginationArmSize + 1
      : undefined;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={pageButtonUrl(1)}
            isActive={currentPageNumber === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {prevEllipsisButtonPageNumber && (
          <PaginationLink href={pageButtonUrl(prevEllipsisButtonPageNumber)}>
            <PaginationEllipsis />
          </PaginationLink>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (pageNum) =>
              pageNum > 1 &&
              pageNum >= currentPageNumber - paginationArmSize &&
              pageNum <= currentPageNumber + paginationArmSize &&
              pageNum < totalPages,
          )
          .map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={pageButtonUrl(pageNum)}
                isActive={currentPageNumber === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

        {nextEllipsisButtonPageNumber && (
          <PaginationLink href={pageButtonUrl(nextEllipsisButtonPageNumber)}>
            <PaginationEllipsis />
          </PaginationLink>
        )}
        <PaginationItem>
          <PaginationLink
            href={pageButtonUrl(totalPages)}
            isActive={currentPageNumber === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default function ClientPage({
  searchKeyword,
  searchKeywordType,
  pageSize,
  itemPage,
}: {
  searchKeyword: string;
  searchKeywordType: string;
  page: number;
  pageSize: number;
  itemPage: components["schemas"]["PageDtoPostDto"];
}) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">공개글 목록</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const searchKeyword = formData.get("searchKeyword") as string;
          const searchKeywordType = formData.get("searchKeywordType") as string;
          const page = formData.get("page") as string;
          const pageSize = formData.get("pageSize") as string;

          router.push(
            `?page=${page}&pageSize=${pageSize}&searchKeywordType=${searchKeywordType}&searchKeyword=${searchKeyword}`,
          );
        }}
      >
        <input type="hidden" name="page" value="1" />
        <select name="pageSize" defaultValue={pageSize}>
          <option disabled>페이당 행 수</option>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
        <select name="searchKeywordType" defaultValue={searchKeywordType}>
          <option disabled>검색어 타입</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>
        <input
          placeholder="검색어를 입력해주세요."
          type="text"
          name="searchKeyword"
          defaultValue={searchKeyword}
        />
        <button type="submit">검색</button>
      </form>

      <div>
        <div>currentPageNumber: {itemPage.currentPageNumber}</div>

        <div>pageSize: {itemPage.pageSize}</div>

        <div>totalPages: {itemPage.totalPages}</div>

        <div>totalItems: {itemPage.totalItems}</div>
      </div>

      <hr />
      <PaginationType1
        className="my-2"
        baseQueryString={`pageSize=${pageSize}&searchKeywordType=${searchKeywordType}&searchKeyword=${searchKeyword}`}
        totalPages={itemPage.totalPages}
        currentPageNumber={itemPage.currentPageNumber}
      />
      <hr />

      <ul>
        {itemPage.items.map((item) => (
          <li key={item.id} className="border-[2px] border-[red] my-3">
            <Link className="block" href={`/post/${item.id}`}>
              <div>id : {item.id}</div>
              <div>createDate : {item.createDate}</div>
              <div>modifyDate : {item.modifyDate}</div>
              <div>authorId : {item.authorId}</div>
              <div>authorName : {item.authorName}</div>
              <div>title : {item.title}</div>
              <div>published : {`${item.published}`}</div>
              <div>listed : {`${item.listed}`}</div>
            </Link>
          </li>
        ))}
      </ul>

      <hr />

      <PaginationType1
        className="my-2"
        baseQueryString={`pageSize=${pageSize}&searchKeywordType=${searchKeywordType}&searchKeyword=${searchKeyword}`}
        totalPages={itemPage.totalPages}
        currentPageNumber={itemPage.currentPageNumber}
      />
    </div>
  );
}
