import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface UsePaginationProps {
  baseQueryString: string;
  totalPages: number;
  currentPageNumber: number;
  paginationArmSize: number;
}

function usePagination({
  baseQueryString,
  totalPages,
  currentPageNumber,
  paginationArmSize,
}: UsePaginationProps) {
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

  const middlePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1,
  ).filter(
    (pageNum) =>
      pageNum > 1 &&
      pageNum < totalPages &&
      pageNum >= currentPageNumber - paginationArmSize &&
      pageNum <= currentPageNumber + paginationArmSize,
  );

  return {
    pageButtonUrl,
    prevEllipsisButtonPageNumber,
    nextEllipsisButtonPageNumber,
    middlePages,
  };
}

export interface PaginationProps {
  className?: string;
  baseQueryString: string;
  totalPages: number;
  currentPageNumber: number;
  paginationArmSize?: number;
}

export default function PaginationType1({
  className,
  baseQueryString,
  totalPages,
  currentPageNumber,
  paginationArmSize = 1,
}: PaginationProps) {
  const {
    pageButtonUrl,
    prevEllipsisButtonPageNumber,
    nextEllipsisButtonPageNumber,
    middlePages,
  } = usePagination({
    baseQueryString,
    totalPages,
    currentPageNumber,
    paginationArmSize,
  });

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationNumber
          pageNumber={1}
          currentPageNumber={currentPageNumber}
          pageButtonUrl={pageButtonUrl}
        />

        {prevEllipsisButtonPageNumber && (
          <PaginationLink href={pageButtonUrl(prevEllipsisButtonPageNumber)}>
            <PaginationEllipsis />
          </PaginationLink>
        )}

        {middlePages.map((pageNum) => (
          <PaginationNumber
            key={pageNum}
            pageNumber={pageNum}
            currentPageNumber={currentPageNumber}
            pageButtonUrl={pageButtonUrl}
          />
        ))}

        {nextEllipsisButtonPageNumber && (
          <PaginationLink href={pageButtonUrl(nextEllipsisButtonPageNumber)}>
            <PaginationEllipsis />
          </PaginationLink>
        )}

        <PaginationNumber
          pageNumber={totalPages}
          currentPageNumber={currentPageNumber}
          pageButtonUrl={pageButtonUrl}
        />
      </PaginationContent>
    </Pagination>
  );
}

const PaginationNumber = ({
  pageNumber,
  currentPageNumber,
  pageButtonUrl,
}: {
  pageNumber: number;
  currentPageNumber: number;
  pageButtonUrl: (page: number) => string;
}) => (
  <PaginationItem>
    <PaginationLink
      href={pageButtonUrl(pageNumber)}
      isActive={pageNumber === currentPageNumber}
    >
      {pageNumber}
    </PaginationLink>
  </PaginationItem>
);
