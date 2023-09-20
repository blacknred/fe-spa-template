import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { create } from 'zustand'

type CounterStore = {
  count: number
  incr: () => void
}

const useCounterStore = create<CounterStore>()((set) => ({
  count: 1,
  incr: () => set((state) => ({ count: state.count + 1 })),
}))

function Counter() {
  const { count, incr } = useCounterStore()
  return (
    <div>
      <span>{count}</span>
      <button onClick={incr}>one up</button>
    </div>
  )
}

describe('Counter', () => {
  test('should render successfully', async () => {
    const wrapper = render(<Counter />)
    expect(wrapper).toBeTruthy()

    const span = await screen.findByText(/^1$/);
    expect(span).toBeTruthy()

    const btn = await screen.findByRole('button', { name: /one up/ });
    expect(btn).toBeTruthy()
  })

  test('should increase count by clicking a button', async () => {
    render(<Counter />)
    const user = userEvent.setup()

    const span = await screen.findByText(/^1$/);
    expect(span).toBeTruthy()

    const spyAnchorTag = vitest.spyOn(user, 'click')
    const btn = await screen.findByRole('button', { name: /one up/ });
    await user.click(btn);
    expect(await screen.findByText(/^2$/)).toBeTruthy()
    expect(spyAnchorTag).toHaveBeenCalledOnce()
  })
})
