import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const ClipboardDiv = styled.div`
  background-size: 12px 12px;
  width: 12px;
  height: 12px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGuSURBVHhe7dtdLsRgHIXxEtwRloM9IFbBQnwthR1IXPlIWAELwAq45vw7fQXpyPQ9bd+JPL/kxGAqnQczc9MKADBXlrVD7UF71960e+1AW9Lwhw3tTvuYslttXUOLBe1Ki1CP2q622mxPe9Lie5da3Be/RKQUr+2vLL6WIu7EF/DThRZx4i9vmn0t7nNef/YPrGhn2qsWD6yPxb9sEs+HN5ObtTWt7ZicvWgnWjyGYk61tpNz9l3Eu57c/NJ2jLNjrZj4LcZJbNafzSadeN+6/twtLe4fj6GYnBg5x8yiyLksNh+RiYCmEgHjFTvEc1BftpuPRZ/PcuQ8h8Rbh3Rc3zvSukjHFZNzAvG+KyKmV/A+9qxFvK7v6dLxxRQ/AZN9/ryImAhoIqCJgCYCmghoIqCJgCYCmghoIqCJgCYCmghoIqCJgCYCmghoIqCJgCYCmghoIqCJgCYCmghoIqCJgCYCmghoIqCJgCYCmghoIqCJgCYCmghoIqCJgCYCmghoIqCJgCYCmtyAQ1w8PZa5uEh7yIunx1rXi7R7NcTF02Mt9yJtAAAAAACAXFX1CYo8GW5b5gU4AAAAAElFTkSuQmCC)
    top left no-repeat;
  )margin: 0;
  padding: 0;
`;

export default ClipboardDiv;
