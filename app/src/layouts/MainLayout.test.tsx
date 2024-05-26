import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './MainLayout';

describe('MainLayout Component', () => {
  test('renders children and navigation links', () => {
    render(
      <Router>
        <MainLayout>
          <div data-testid="test-child">Test Child Component</div>
        </MainLayout>
      </Router>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Bills/i)).toBeInTheDocument();
  });
});
