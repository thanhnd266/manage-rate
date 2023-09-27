import styled from "styled-components";

export const DashLayoutWrapper = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
    background: #fafbfc;
`;

export const DashLayoutContent = styled.div`
    position: relative;
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
`;

export const DashLayoutChildWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;

export const DashLayoutChildComponent = styled.div`
    margin: 0 auto;
    max-width: 1536px;
    padding: 4rem;
`;