import styled from "styled-components";

export const FormInterestRateHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .type-interest-rate {
        margin-left: 5rem;
    }

    span {
        font-weight: 600;
    }
`;

export const FormInterestRateTable = styled.div`
    background: ${props => props.theme.colors.bodydark1};
    padding: 20px;
`;