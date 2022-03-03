service NorthwindMock {
    @readonly
    entity Order_Subtotals {
        OrderID: Integer;
        Subtotal: Decimal(19,4)
    }
}