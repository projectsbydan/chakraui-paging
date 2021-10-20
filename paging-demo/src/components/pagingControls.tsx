import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface IPagingControls {
    totalCount: number;
    totalCountDescription: string;
    pageSize: number;
    onGoToPage: (pageNumber: number) => void;
    currentPage: number;
}

const getPageNumbers = (
    currentPage: number,
    totalCount: number,
    pageSize: number,
    currentPages: number[]
) => {
    if (currentPages.indexOf(currentPage) !== -1) {
        return currentPages;
    }

    const maxNumber = Math.ceil(totalCount / pageSize);

    const firstPagePosition = Math.min(currentPage, maxNumber - 4);

    const result: number[] = [];
    for (let i = firstPagePosition - 1; i < firstPagePosition + 4 && i < maxNumber; i++) {
        if (i < 0) {
            continue;
        }

        result.push(i + 1);
    }

    return result;
};

export const PagingControls = (props: IPagingControls) => {
    const [pages, setPages] = useState(getPageNumbers(
        props.currentPage,
        props.totalCount,
        props.pageSize, []
    ));

    useEffect(() => {
        setPages(getPageNumbers(
            props.currentPage,
            props.totalCount,
            props.pageSize, pages));
    }, [props.currentPage]);

    return (
        <Stack align="center">
            {pages.length > 1 && (
                <HStack>
                    <IconButton
                        disabled={props.currentPage - 1 <= 0}
                        aria-label="previous"
                        onClick={() => props.onGoToPage(props.currentPage - 1)}
                        icon={<ArrowBackIcon />}
                    ></IconButton>
                    {pages.map((pageNumber) => (
                        <Button
                            key={pageNumber}
                            onClick={() => props.onGoToPage(pageNumber)}
                            colorScheme={pageNumber === props.currentPage ? "teal" : undefined}
                        >
                            {pageNumber}
                        </Button>
                    ))}
                    <IconButton
                        aria-label="next"
                        disabled={Math.max(...pages) +1 > props.totalCount / props.pageSize}
                        onClick={() => props.onGoToPage(props.currentPage + 1)}
                        icon={<ArrowForwardIcon />}
                    ></IconButton>
                </HStack>
            )}
            <Text fontWeight="extrabold">
                {props.totalCount} {props.totalCountDescription}
            </Text>
        </Stack>
    );
};
